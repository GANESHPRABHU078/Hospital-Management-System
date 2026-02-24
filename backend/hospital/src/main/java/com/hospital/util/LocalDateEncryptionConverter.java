package com.hospital.util;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.time.LocalDate;
import java.util.Base64;

@Converter
@Component
public class LocalDateEncryptionConverter implements AttributeConverter<LocalDate, String> {

    private static final String ALGORITHM = "AES/ECB/PKCS5Padding";
    private static String secretKey;

    @Value("${encryption.secret.key}")
    public void setSecretKey(String key) {
        secretKey = key;
    }

    private static String getSecretKey() {
        if (secretKey == null) {
            return "p2s5v8y/B?E(G+KbPeShVmYq3t6w9z$B";
        }
        return secretKey;
    }

    @Override
    public String convertToDatabaseColumn(LocalDate attribute) {
        if (attribute == null) return null;
        try {
            Key key = new SecretKeySpec(getSecretKey().getBytes(), "AES");
            Cipher c = Cipher.getInstance(ALGORITHM);
            c.init(Cipher.ENCRYPT_MODE, key);
            return Base64.getEncoder().encodeToString(c.doFinal(attribute.toString().getBytes()));
        } catch (Exception e) {
            throw new RuntimeException("Error encrypting date", e);
        }
    }

    @Override
    public LocalDate convertToEntityAttribute(String dbData) {
        if (dbData == null) return null;
        try {
            Key key = new SecretKeySpec(getSecretKey().getBytes(), "AES");
            Cipher c = Cipher.getInstance(ALGORITHM);
            c.init(Cipher.DECRYPT_MODE, key);
            return LocalDate.parse(new String(c.doFinal(Base64.getDecoder().decode(dbData))));
        } catch (Exception e) {
            try {
                // Fallback: try parsing as plain text LocalDate
                return LocalDate.parse(dbData);
            } catch (Exception ignored) {
                System.err.println("Decryption failed for date [" + dbData + "]. Error: " + e.getMessage());
                return null;
            }
        }
    }
}

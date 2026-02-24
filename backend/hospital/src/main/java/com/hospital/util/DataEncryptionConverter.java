package com.hospital.util;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;

@Converter
@Component
public class DataEncryptionConverter implements AttributeConverter<String, String> {

    private static final String ALGORITHM = "AES/ECB/PKCS5Padding";
    private static String secretKey;

    @Value("${encryption.secret.key}")
    public void setSecretKey(String key) {
        secretKey = key;
    }

    private static String getSecretKey() {
        if (secretKey == null) {
            // Fallback for cases where Spring hasn't injected yet but JPA instantiated the converter
            return "p2s5v8y/B?E(G+KbPeShVmYq3t6w9z$B"; // Matching application.properties default
        }
        return secretKey;
    }

    @Override
    public String convertToDatabaseColumn(String attribute) {
        if (attribute == null) return null;
        try {
            Key key = new SecretKeySpec(getSecretKey().getBytes(), "AES");
            Cipher c = Cipher.getInstance(ALGORITHM);
            c.init(Cipher.ENCRYPT_MODE, key);
            return Base64.getEncoder().encodeToString(c.doFinal(attribute.getBytes()));
        } catch (Exception e) {
            throw new RuntimeException("Error encrypting data", e);
        }
    }

    @Override
    public String convertToEntityAttribute(String dbData) {
        if (dbData == null) return null;
        try {
            Key key = new SecretKeySpec(getSecretKey().getBytes(), "AES");
            Cipher c = Cipher.getInstance(ALGORITHM);
            c.init(Cipher.DECRYPT_MODE, key);
            return new String(c.doFinal(Base64.getDecoder().decode(dbData)));
        } catch (Exception e) {
            // Log warning and return raw data - handles legacy plain text data
            System.err.println("Decryption failed for data [" + dbData + "], returning original. Error: " + e.getMessage());
            return dbData;
        }
    }
}

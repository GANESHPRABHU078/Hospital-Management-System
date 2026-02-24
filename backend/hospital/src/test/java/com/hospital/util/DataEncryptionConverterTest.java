package com.hospital.util;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

public class DataEncryptionConverterTest {

    private DataEncryptionConverter converter;
    private final String secretKey = "p2s5v8y/B?E(G+KbPeShVmYq3t6w9z$B";

    @BeforeEach
    public void setup() {
        converter = new DataEncryptionConverter();
        converter.setSecretKey(secretKey);
    }

    @Test
    public void testEncryptionDecryption() {
        String originalData = "Sensitive Patient Information";
        
        String encryptedData = converter.convertToDatabaseColumn(originalData);
        assertNotEquals(originalData, encryptedData);
        
        String decryptedData = converter.convertToEntityAttribute(encryptedData);
        assertEquals(originalData, decryptedData);
    }

    @Test
    public void testNullHandling() {
        assertEquals(null, converter.convertToDatabaseColumn(null));
        assertEquals(null, converter.convertToEntityAttribute(null));
    }
}

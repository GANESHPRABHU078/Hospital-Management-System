package com.hospital.service;

import com.hospital.entity.AuditLog;
import com.hospital.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuditLogService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    public void log(String email, String action, String details, String ipAddress) {
        AuditLog log = AuditLog.builder()
                .email(email)
                .action(action)
                .details(details)
                .ipAddress(ipAddress)
                .build();
        auditLogRepository.save(log);
    }
}

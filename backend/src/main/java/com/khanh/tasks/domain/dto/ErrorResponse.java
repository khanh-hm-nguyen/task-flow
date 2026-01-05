package com.khanh.tasks.domain.dto;

public record ErrorResponse(int status, String message, String details) {
}

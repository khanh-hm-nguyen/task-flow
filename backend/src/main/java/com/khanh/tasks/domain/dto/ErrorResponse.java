package com.khanh.tasks.domain.dto;

/**
 * Purpose: Standardizes error messages sent to the frontend.
 *
 * @param status
 * @param message
 * @param details
 */
public record ErrorResponse(int status, String message, String details) {
}

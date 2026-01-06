package com.khanh.tasks.domain.dto;

import com.khanh.tasks.domain.entities.TaskPriority;
import com.khanh.tasks.domain.entities.TaskStatus;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * TaskDto (Record)
 * Purpose: Carries task data.
 * Records for immutability and automatic getter/constructor generation.
 *
 * @param id
 * @param title
 * @param description
 * @param dueDate
 * @param priority
 * @param status
 */
public record TaskDto (UUID id,
                       String title,
                       String description,
                       LocalDateTime dueDate,
                       TaskPriority priority,
                       TaskStatus status) {


}

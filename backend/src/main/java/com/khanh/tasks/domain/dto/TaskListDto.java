package com.khanh.tasks.domain.dto;

import java.util.List;
import java.util.UUID;

/**
 * Purpose: Carries task list data.
 * Records for immutability and automatic getter/constructor generation.
 *
 * @param id
 * @param title
 * @param description
 * @param count
 * @param progress
 * @param tasks
 */
public record TaskListDto (
        UUID id,
        String title,
        String description,
        Integer count,
        Double progress,
        List<TaskDto> tasks
) {
}

package com.khanh.tasks.mappers.impl;

import com.khanh.tasks.domain.dto.TaskDto;
import com.khanh.tasks.domain.entities.Task;
import com.khanh.tasks.mappers.TaskMapper;
import org.springframework.stereotype.Component;

/**
 * Responsible for converting between Task entity and DTO
 */
@Component
public class TaskMapperImpl implements TaskMapper {

    /**
     * fromDto(TaskDto): Converts a DTO into a Task entity (used when creating/updating).
     * @param taskDto
     * @return
     */
    @Override
    public Task fromDto(TaskDto taskDto) {
        return new Task(
                taskDto.id(),
                taskDto.title(),
                taskDto.description(),
                taskDto.dueDate(),
                taskDto.status(),
                taskDto.priority(),
                null,
                null,
                null
        );
    }

    /**
     * toDto(Task): Converts a Task entity into a DTO (used when sending data to frontend).
     * @param task
     * @return
     */
    @Override
    public TaskDto toDto(Task task) {
        return new TaskDto(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getDueDate(),
                task.getPriority(),
                task.getStatus()
        );
    }


}

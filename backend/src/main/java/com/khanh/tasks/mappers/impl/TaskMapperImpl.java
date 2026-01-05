package com.khanh.tasks.mappers.impl;

import com.khanh.tasks.domain.dto.TaskDto;
import com.khanh.tasks.domain.entities.Task;
import com.khanh.tasks.mappers.TaskMapper;
import org.springframework.stereotype.Component;


@Component
public class TaskMapperImpl implements TaskMapper {
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

    @Override
    public TaskDto toDto(Task task) {
        // FIX: Provide the actual implementation
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

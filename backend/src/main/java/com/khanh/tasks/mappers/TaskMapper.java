package com.khanh.tasks.mappers;

import com.khanh.tasks.domain.dto.TaskDto;
import com.khanh.tasks.domain.entities.Task;

public interface TaskMapper {

   Task fromDto(TaskDto taskDto);

   TaskDto toDto(Task task);


}

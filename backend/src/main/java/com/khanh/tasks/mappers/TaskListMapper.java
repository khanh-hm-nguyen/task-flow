package com.khanh.tasks.mappers;

import com.khanh.tasks.domain.dto.TaskListDto;
import com.khanh.tasks.domain.entities.TaskList;

public interface TaskListMapper {

    TaskList fromDto(TaskListDto taskListDto);

    TaskListDto toDto(TaskList taskList);
}

package com.khanh.tasks.services;

import com.khanh.tasks.domain.entities.TaskList;

import java.util.List;
import java.util.UUID;
import java.util.Optional;

public interface TaskListService {
    List<TaskList> listTaskLists();
    TaskList createTaskList(TaskList taskList);
    Optional<TaskList> getTaskList(UUID id);
    TaskList updateTaskList(UUID taskListId, TaskList taskList);
    void deleteTaskList(UUID taskListId);
}

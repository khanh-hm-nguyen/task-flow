package com.khanh.tasks.services;

import com.khanh.tasks.domain.entities.TaskList;
import com.khanh.tasks.domain.entities.User;

import java.util.List;
import java.util.UUID;
import java.util.Optional;

public interface TaskListService {
    List<TaskList> listTaskLists(User user);
    TaskList createTaskList(TaskList taskList, User user);
    Optional<TaskList> getTaskList(UUID id);
    TaskList updateTaskList(UUID taskListId, TaskList taskList, User user);
    void deleteTaskList(UUID taskListId, User currentUser);

}

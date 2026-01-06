package com.khanh.tasks.services.impl;

import com.khanh.tasks.domain.entities.TaskList;
import com.khanh.tasks.repositories.TaskListRepository;
import com.khanh.tasks.services.TaskListService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class TaskListServiceImpl implements TaskListService {

    private final TaskListRepository taskListRepository;

    public TaskListServiceImpl(TaskListRepository taskListRepository) {
        this.taskListRepository = taskListRepository;
    }

    /**
     * Retrieve all task lists
     * @return
     */
    @Override
    public List<TaskList> listTaskLists() {
        return taskListRepository.findAll();
    }


    /**
     * Create new task list
     *
     * @param taskList
     * @return
     */
    @Override
    public TaskList createTaskList(TaskList taskList) {

        if (null != taskList.getId()) {
            throw new IllegalArgumentException("Task list already has an ID!");
        }

        if (null == taskList.getTitle() || taskList.getTitle().isBlank()) {
            throw new IllegalArgumentException("Task list title must be present");
        }

        LocalDateTime now = LocalDateTime.now();

        return taskListRepository.save(new TaskList(
                null,
                taskList.getTitle(),
                taskList.getDescription(),
                null,
                now,
                now
        ));

    }

    /**
     * Retrieve tasklist by id
     * @param id
     * @return
     */
    @Override
    public Optional<TaskList> getTaskList(UUID id) {
        return taskListRepository.findById(id);

    }

    /**
     * Update tasklist by task list id
     *
     * @param taskListId
     * @param taskList
     * @return
     */
    @Transactional
    @Override
    public TaskList updateTaskList(UUID taskListId, TaskList taskList) {

       // System.out.println(taskListId);

        if (null == taskList.getId()) {
            throw new IllegalArgumentException("Task List must have an ID");
        }

        if (!Objects.equals(taskList.getId(), taskListId)) {
            throw new IllegalArgumentException("Attempting to change task list ID, this is not permitted");
        }

        TaskList existingTaskList = taskListRepository.findById(taskListId).orElseThrow(() ->
                new IllegalArgumentException("Task list not found!"));
        existingTaskList.setTitle(taskList.getTitle());
        existingTaskList.setDescription(taskList.getDescription());
        existingTaskList.setUpdated(LocalDateTime.now());
        return taskListRepository.save(existingTaskList);
    }

    /**
     * remove task list by uuid
     * @param taskListId
     */
    @Override
    public void deleteTaskList(UUID taskListId) {
        taskListRepository.deleteById(taskListId);
    }


}

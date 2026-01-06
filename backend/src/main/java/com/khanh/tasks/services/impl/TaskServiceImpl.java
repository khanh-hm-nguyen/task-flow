package com.khanh.tasks.services.impl;

import com.khanh.tasks.domain.entities.Task;
import com.khanh.tasks.domain.entities.TaskList;
import com.khanh.tasks.domain.entities.TaskPriority;
import com.khanh.tasks.domain.entities.TaskStatus;
import com.khanh.tasks.repositories.TaskListRepository;
import com.khanh.tasks.repositories.TaskRepository;
import com.khanh.tasks.services.TaskService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final TaskListRepository taskListRepository;

    public TaskServiceImpl(TaskRepository taskRepository, TaskListRepository taskListRepository) {
        this.taskRepository = taskRepository;
        this.taskListRepository = taskListRepository;
    }

    /**
     * Retreive all tasks by tasklist id
     *
     * @param taskListId
     * @return
     */
    @Override
    public List<Task> listTasks(UUID taskListId) {
        return taskRepository.findByTaskListId(taskListId);
    }

    /**
     * createTask:
     * Validates that the task title is not empty.
     * Checks if the parent TaskList exists.
     * Sets default values (OPEN status, MEDIUM priority).
     * Sets timestamps (created, updated).
     *
     * @param taskListId
     * @param task
     * @return
     */
    @Transactional
    @Override
    public Task creatTask(UUID taskListId, Task task) {
        if (null != task.getId()) {
            throw new IllegalArgumentException("Task already has an ID");
        }
        if (null == task.getTitle() || task.getTitle().isBlank()) {
            throw new IllegalArgumentException("Task must have a title");
        }

        TaskPriority taskPriority = Optional.ofNullable(task.getPriority()).orElse(TaskPriority.MEDIUM);

        TaskStatus taskStatus = TaskStatus.OPEN;

        TaskList taskList = taskListRepository.findById(taskListId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Task List ID provided"));

        LocalDateTime now = LocalDateTime.now();

        Task taskToSave = new Task(
                null,
                task.getTitle(),
                task.getDescription(),
                task.getDueDate(),
                taskStatus,
                taskPriority,
                taskList,
                now,
                now
        );

        return taskRepository.save(taskToSave);


    }


    /**
     * Retrieve task by task id and tasklist id
     *
     * @param taskListId
     * @param taskId
     * @return
     */
    @Override
    public Optional<Task> getTask(UUID taskListId, UUID taskId) {
        return taskRepository.findByTaskListIdAndId(taskListId, taskId);
    }

    /**
     * updateTask:
     * Fetches the existing task.
     * Updates specific fields (Title, Description, Priority, Status, Due Date).
     * Updates the updated timestamp.
     *
     * @param taskListId
     * @param taskId
     * @param task
     * @return
     */
    @Transactional
    @Override
    public Task updateTask(UUID taskListId, UUID taskId, Task task) {
        if(null == task.getId()) {
            throw new IllegalArgumentException("Task must have an ID!");
        }
        if(!Objects.equals(taskId, task.getId())) {
            throw new IllegalArgumentException("Task IDs do not match");
        }
        if (null == task.getPriority()) {
            throw new IllegalArgumentException("Task Must have a valid priority!");
        }
        if (null == task.getStatus()) {
            throw new IllegalArgumentException("Task Must have a valid status!");
        }

        Task existingTask = taskRepository.findByTaskListIdAndId(taskListId, taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));


        existingTask.setTitle(task.getTitle());
        existingTask.setDescription(task.getDescription());
        existingTask.setDueDate(task.getDueDate());
        existingTask.setPriority(task.getPriority());
        existingTask.setStatus(task.getStatus());
        existingTask.setUpdated(LocalDateTime.now());

        return taskRepository.save(existingTask);
    }


    /**
     * Delete specific task by task id and tasklist id
     *
     * @param taskListId
     * @param taskId
     */
    @Transactional
    @Override
    public void deleteTask(UUID taskListId, UUID taskId) {
        taskRepository.deleteByTaskListIdAndId(taskListId, taskId);
    }
}

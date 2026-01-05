package com.khanh.tasks.controllers;

import com.khanh.tasks.domain.dto.TaskListDto;
import com.khanh.tasks.domain.entities.TaskList;
import com.khanh.tasks.mappers.TaskListMapper;
import com.khanh.tasks.services.TaskListService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(path = "/task-lists")
public class TaskListController {

    private final TaskListService taskListService;
    private final TaskListMapper taskListMapper;

    public TaskListController(TaskListService taskListService, TaskListMapper taskListMapper) {
        this.taskListService = taskListService;
        this.taskListMapper = taskListMapper;
    }

    @GetMapping
    public List<TaskListDto> listTaskLists() {
        return taskListService.listTaskLists().stream()
                .map(taskListMapper::toDto)
                .toList();
    }

    @PostMapping
    public TaskListDto createTaskList(@RequestBody TaskListDto taskListDto) {
        TaskList createdTaskList =  taskListService.createTaskList(
                taskListMapper.fromDto(taskListDto)
        );

        return taskListMapper.toDto(createdTaskList);
    }

    @PostMapping(path ="/{task_list_id}")
    public Optional<TaskListDto> getTaskList(@PathVariable("task_list_id")UUID taskListId) {
        return taskListService.getTaskList(taskListId).map(taskListMapper::toDto);
    }

    @PutMapping(path = "/{task_list_id}")
    public TaskListDto updateTaskList(
            @PathVariable("task_list_id") UUID taskListId,
            @RequestBody TaskListDto taskListDto
    ) {
        // 1. Convert DTO to Entity
        TaskList mappedTaskList = taskListMapper.fromDto(taskListDto);

        // 2. FIX: Manually set the ID from the URL onto the entity
        mappedTaskList.setId(taskListId);

        // 3. Now pass it to the service (it won't be null anymore!)
        TaskList updatedTaskList = taskListService.updateTaskList(
                taskListId,
                mappedTaskList
        );
        return taskListMapper.toDto(updatedTaskList);
    }

    @DeleteMapping(path = "/{task_list_id}")
    public void deleteTaskList(@PathVariable("task_list_id") UUID taskListId) {
        taskListService.deleteTaskList(taskListId);
    }

}

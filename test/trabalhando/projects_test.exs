defmodule Trabalhando.ProjectsTest do
  use Trabalhando.DataCase

  alias Trabalhando.Projects

  describe "projects" do
    alias Trabalhando.Projects.Project

    import Trabalhando.ProjectsFixtures

    @invalid_attrs %{name: nil, hour_value: nil, currency: nil}

    test "list_projects/0 returns all projects" do
      project = project_fixture()
      assert Projects.list_projects() == [project]
    end

    test "get_project!/1 returns the project with given id" do
      project = project_fixture()
      assert Projects.get_project!(project.id) == project
    end

    test "create_project/1 with valid data creates a project" do
      valid_attrs = %{name: "some name", hour_value: "120.5", currency: "some currency"}

      assert {:ok, %Project{} = project} = Projects.create_project(valid_attrs)
      assert project.name == "some name"
      assert project.hour_value == Decimal.new("120.5")
      assert project.currency == "some currency"
    end

    test "create_project/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Projects.create_project(@invalid_attrs)
    end

    test "update_project/2 with valid data updates the project" do
      project = project_fixture()
      update_attrs = %{name: "some updated name", hour_value: "456.7", currency: "some updated currency"}

      assert {:ok, %Project{} = project} = Projects.update_project(project, update_attrs)
      assert project.name == "some updated name"
      assert project.hour_value == Decimal.new("456.7")
      assert project.currency == "some updated currency"
    end

    test "update_project/2 with invalid data returns error changeset" do
      project = project_fixture()
      assert {:error, %Ecto.Changeset{}} = Projects.update_project(project, @invalid_attrs)
      assert project == Projects.get_project!(project.id)
    end

    test "delete_project/1 deletes the project" do
      project = project_fixture()
      assert {:ok, %Project{}} = Projects.delete_project(project)
      assert_raise Ecto.NoResultsError, fn -> Projects.get_project!(project.id) end
    end

    test "change_project/1 returns a project changeset" do
      project = project_fixture()
      assert %Ecto.Changeset{} = Projects.change_project(project)
    end
  end

  describe "tasks" do
    alias Trabalhando.Projects.Task

    import Trabalhando.ProjectsFixtures

    @invalid_attrs %{status: nil, description: nil, identifier: nil}

    test "list_tasks/0 returns all tasks" do
      task = task_fixture()
      assert Projects.list_tasks() == [task]
    end

    test "get_task!/1 returns the task with given id" do
      task = task_fixture()
      assert Projects.get_task!(task.id) == task
    end

    test "create_task/1 with valid data creates a task" do
      valid_attrs = %{status: :todo, description: "some description", identifier: "some identifier"}

      assert {:ok, %Task{} = task} = Projects.create_task(valid_attrs)
      assert task.status == :todo
      assert task.description == "some description"
      assert task.identifier == "some identifier"
    end

    test "create_task/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Projects.create_task(@invalid_attrs)
    end

    test "update_task/2 with valid data updates the task" do
      task = task_fixture()
      update_attrs = %{status: :doing, description: "some updated description", identifier: "some updated identifier"}

      assert {:ok, %Task{} = task} = Projects.update_task(task, update_attrs)
      assert task.status == :doing
      assert task.description == "some updated description"
      assert task.identifier == "some updated identifier"
    end

    test "update_task/2 with invalid data returns error changeset" do
      task = task_fixture()
      assert {:error, %Ecto.Changeset{}} = Projects.update_task(task, @invalid_attrs)
      assert task == Projects.get_task!(task.id)
    end

    test "delete_task/1 deletes the task" do
      task = task_fixture()
      assert {:ok, %Task{}} = Projects.delete_task(task)
      assert_raise Ecto.NoResultsError, fn -> Projects.get_task!(task.id) end
    end

    test "change_task/1 returns a task changeset" do
      task = task_fixture()
      assert %Ecto.Changeset{} = Projects.change_task(task)
    end
  end
end

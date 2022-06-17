interface EditTaskInterface {
  title: string;
}

interface AddTaskInterface {
  title: string;
  projectId?: string;
}

export { EditTaskInterface, AddTaskInterface };

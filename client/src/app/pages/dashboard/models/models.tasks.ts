type Status = 'in-progress' | 'completed';

interface Task {
  _id: string;
  title: string;
  status: Status;
  created: Date;
  completed: Date | null;
}

interface AddTask {
  title: string;
}

interface EditTask {
  title: string;
}

export { Task, AddTask, EditTask, Status };

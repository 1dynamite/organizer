import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { TodoService } from '../../todo/services/todo.service';

import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let httpController: HttpTestingController;
  let todoServiceSpy: jasmine.SpyObj<TodoService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj(
      'TodoService',
      ['addItem', 'deleteItem', 'updateItem', 'updateManyItems', 'reOrder'],
      { items: [] }
    );

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: TodoService, useValue: spy }, ProjectsService],
    });

    httpController = TestBed.inject(HttpTestingController);
    todoServiceSpy = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    service = TestBed.inject(ProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();

    const request = httpController.expectOne({
      method: 'GET',
    });

    request.flush(['item']);
    expect(service.todoService.items).toEqual([]);
  });

  it('should add project', () => {
    service.addProject({ data: 'some data' }).subscribe();

    const request = httpController.expectOne({
      method: 'POST',
      url: service.projectsUrl,
    });

    expect(request.request.body).toEqual({ data: 'some data' });

    request.flush({ data: 'returned data' });

    expect(todoServiceSpy.addItem).toHaveBeenCalledOnceWith({
      data: 'returned data',
    });
  });

  it('should delete project', () => {
    service.deleteProject('someId').subscribe((res) => {
      expect(todoServiceSpy.deleteItem).toHaveBeenCalledOnceWith('someId');
      expect(res).toEqual({ _id: 'return value' });
    });

    const request = httpController.expectOne({
      method: 'DELETE',
      url: service.projectsUrl + 'someId',
    });

    request.flush({ _id: 'return value' });
  });

  it('should update project', () => {
    service.updateProject('someId', { data: 'some data' }).subscribe((res) => {
      expect(todoServiceSpy.updateItem).toHaveBeenCalledOnceWith('someId', {
        data: 'some data',
      });
      expect(res).toEqual({ _id: 'return value' });
    });

    const request = httpController.expectOne({
      method: 'PATCH',
      url: service.projectsUrl + 'someId',
    });

    expect(request.request.body).toEqual({ data: 'some data' });

    request.flush({ _id: 'return value' });
  });

  it('should update many projects', () => {
    service
      .updateManyProjects([{ _id: 'someId', myData: {} }])
      .subscribe((res) => {
        expect(todoServiceSpy.updateManyItems).toHaveBeenCalledOnceWith(res);
        expect(res).toEqual([{ a: '' }]);
      });

    const requests = httpController.match({
      method: 'PATCH',
      url: service.projectsUrl + 'someId',
    });

    expect(requests.length).toBe(1);
    requests[0].flush({ a: '' });
  });

  it('should reorder projects', () => {
    const event: any = { a: 'test' };

    service.updateManyProjects = jasmine
      .createSpy('updateManyProjects')
      .and.returnValue(new Observable());

    todoServiceSpy.reOrder.and.returnValue(['test value']);

    service.reOrder(event);

    expect(todoServiceSpy.reOrder).toHaveBeenCalledOnceWith(event);
    expect(service.updateManyProjects).toHaveBeenCalledOnceWith(['test value']);
  });
});

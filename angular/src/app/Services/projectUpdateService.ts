import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEndPoint } from './apiendpoint';
@Injectable({
  providedIn: 'root'
})
export class ProjectUpdateService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint();
  }

  getAllItem(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}project-resources`);
  }

  createItem(projectData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}project-resources`, projectData);
  }

  getItemById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}project-resources/${id}/by-id`);
  }

  updateItem(id: number, projectData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}project-resources/${id}`, projectData);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}project-resources/${id}`);
  }
}

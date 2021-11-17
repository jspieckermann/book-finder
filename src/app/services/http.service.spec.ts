import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

describe('HttpService', () => {
  let service: HttpService;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
  const url = 'test/test';
  const content = 'content';
  const headers = new HttpHeaders().set('content-type', 'application/json');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpService,
        { provide: HttpClient, useValue: mockedHttpClient }
      ]
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should call POST method on HttpClient', () => {
    service.doPost(url, content);
    expect(mockedHttpClient.post).toHaveBeenCalledWith(url, content, { headers });
  });

  it('should call PUT method on HttpClient', () => {
    service.doPut(url, content);
    expect(mockedHttpClient.put).toHaveBeenCalledWith(url, content, { headers });
  });

  it('should call DELETE method on HttpClient', () => {
    service.doDelete(url);
    expect(mockedHttpClient.delete).toHaveBeenCalledWith(url);
  });

  it('should call GET method on HttpClient', () => {
    let myMap: Map<string, string> = new Map();
    myMap.set('startIndex', '0');
    let params = new HttpParams();
    params = params.set('startIndex', '0');
    service.doGet(url, myMap);
    expect(mockedHttpClient.get).toHaveBeenCalledWith(url, { params });
    service.doGet(url);
    expect(mockedHttpClient.get).toHaveBeenCalledWith(url);
  });

});

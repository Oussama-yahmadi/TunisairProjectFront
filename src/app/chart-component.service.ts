import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartComponentService {

  constructor(private http: HttpClient) { }

  calculateConversionRate(): Observable<number> {
    return this.http.get<number>(`http://localhost:8089/PFE/User/conversion-rate`);
  }

  getUniversityAnalysis(): Observable<Map<string, Map<string, Object>>> {
    return this.http.get<Map<string, Map<string, Object>>>(`http://localhost:8089/PFE/User/university-analysis`);
  }



  getStagesAnalysis(): Observable<Map<string, Object>> {
    return this.http.get<Map<string, Object>>(`http://localhost:8089/PFE/stage/stages-analysis`);
  }
}

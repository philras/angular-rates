import { Component, OnInit } from "@angular/core"
import { HttpClient } from "@angular/common/http"

import { Exchange } from "./exchange"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "angular-rates";
  results: Exchange[];
  interval: number;
  timer: number;
  progress: number;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.refreshData();
    this.progress = 0
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(()=> {
      this.refreshData();
      this.progress = 0;
    }, 10000);

    if(this.timer){
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      this.progress += 5;
    }, 500);
  }

  refreshData(): void {
    this.http
      .get<Exchange[]>(
        "https://forex.1forge.com/1.0.3/quotes?&api_key=J3IeIohCCDlZ8Sd3P6RZL5j5jwH7btXi"
      )
      .subscribe(
        data => {
          this.results = data
    console.log("hello" + this.results);

        },
        err => {
          console.log("Error fetching data")
        }
      )
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {PojoService} from '../pojo.service';

@Component({
  selector: 'app-sofor',
  templateUrl: './sofor.component.html',
  styleUrls: ['./sofor.component.css']
})
export class SoforComponent implements OnInit {

  soforler: any;
  stateSoforEkleme = false;

  soforForm: FormGroup;

  displaySofor = false;
  displayingSofor: any;

  updateSofor: any;
  submitButtonText = 'Sofor Ekle';
  date1: any;

  constructor(@Inject(HttpClient) private httpClient: HttpClient, @Inject(PojoService) private pojoService: PojoService) {
    this.soforForm = new FormGroup( {
      soforIsmi: new FormControl(),
      soforSoyismi: new FormControl(),
      soforDogumYili: new FormControl(),
      soforYasi: new FormControl(),
      soforMaasi: new FormControl()
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.updateSofor) {
      this.soforForm.value.id = this.updateSofor.id;
      this.pojoService.update(`http://localhost:8080/soforler/sofor`, this.soforForm.value).subscribe(
        (next) => {
          this.httpClient.get('http://localhost:8080/soforler').subscribe(
            (result) => {
              this.soforler = result;
              this.updateSofor = null;
              this.soforForm.reset();
              this.submitButtonText = 'Sofor Ekle';
            }
          );
        }
      ) ;
    } else {
      this.pojoService.save('http://localhost:8080/soforler', this.soforForm.value).subscribe(
        (next) => {
          this.httpClient.get('http://localhost:8080/soforler').subscribe(
            (result) => {
              this.soforler = result;
              this.soforForm.reset();
              this.stateSoforEkleme = false;
            }
          );
        }
      );
    }

  }

  onDelete(id: string) {
    this.pojoService.delete(`http://localhost:8080/soforler/sofor/${id}`, this.soforForm.value).subscribe(
      (next) => {
        this.httpClient.get('http://localhost:8080/soforler').subscribe(
          (result) => {
            this.soforler = result;
          }
        );
      }
    );
  }

  onDisplay(id: string) {
    this.pojoService.get(`http://localhost:8080/soforler/${id}`).subscribe(
      (next) => {
        this.displayingSofor = next;
        this.displaySofor = true;
      }
    );
  }

  onUpload(id: string) {

    this.submitButtonText = 'Güncelle';

    this.stateSoforEkleme = true;
    this.pojoService.get(`http://localhost:8080/sofor/${id}`).subscribe(
      (next) => {
        this.updateSofor = next;
        this.soforForm.controls.soforIsmi.setValue(this.updateSofor.soforIsmi);
        this.soforForm.controls.soforSoyismi.setValue(this.updateSofor.soforSoyismi);
        this.soforForm.controls.soforDogumYili.setValue(this.updateSofor.soforDogumYili);
        this.soforForm.controls.soforYasi.setValue(this.updateSofor.soforYasi);
        this.soforForm.controls.soforMaas.setValue(this.updateSofor.muavinMaas);
      }
    );

  }


}

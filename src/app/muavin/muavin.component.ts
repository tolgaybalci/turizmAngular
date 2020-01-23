import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {PojoService} from '../pojo.service';

@Component({
  selector: 'app-muavin',
  templateUrl: './muavin.component.html',
  styleUrls: ['./muavin.component.css']
})
export class MuavinComponent implements OnInit {

  muavinler: any;
  stateMuavinEkleme = false;

  muavinForm: FormGroup;

  displayMuavin = false;
  displayingMuavin: any;

  updateMuavin: any;
  submitButtonText = 'Muavin Ekle';
  date1: any;

  constructor(@Inject(HttpClient) private httpClient: HttpClient, @Inject(PojoService) private pojoService: PojoService) {
    this.muavinForm = new FormGroup( {
      muavinIsmi: new FormControl(),
      muavinSoyIsmi: new FormControl(),
      muavinYasi: new FormControl(),
      muavinDogumYili: new FormControl(),
      muavinMaas: new FormControl()
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.updateMuavin) {
      this.muavinForm.value.id = this.updateMuavin.id;
      this.pojoService.update(`http://localhost:8080/muavinler/muavin`, this.muavinForm.value).subscribe(
        (next) => {
          this.httpClient.get('http://localhost:8080/muavinler').subscribe(
            (result) => {
              this.muavinler = result;
              this.updateMuavin = null;
              this.muavinForm.reset();
              this.submitButtonText = 'Muavin Ekle';
            }
          );
        }
      ) ;
    } else {
      this.pojoService.save('http://localhost:8080/muavinler', this.muavinForm.value).subscribe(
        (next) => {
          this.httpClient.get('http://localhost:8080/muavinler').subscribe(
            (result) => {
              this.muavinler = result;
              this.muavinForm.reset();
              this.stateMuavinEkleme = false;
            }
          );
        }
      );
    }

  }

  onDelete(id: string) {
    this.pojoService.delete(`http://localhost:8080/muavinler/muavin/${id}`, this.muavinForm.value).subscribe(
      (next) => {
        this.httpClient.get('http://localhost:8080/muavinler').subscribe(
          (result) => {
            this.muavinler = result;
          }
        );
      }
    );
  }

  onDisplay(id: string) {
    this.pojoService.get(`http://localhost:8080/muavinler/${id}`).subscribe(
      (next) => {
        this.displayingMuavin = next;
        this.displayMuavin = true;
      }
    );
  }

  onUpload(id: string) {

    this.submitButtonText = 'Güncelle';

    this.stateMuavinEkleme = true;
    this.pojoService.get(`http://localhost:8080/muavin/${id}`).subscribe(
      (next) => {
        this.updateMuavin = next;
        this.muavinForm.controls.muavinIsmi.setValue(this.updateMuavin.muavinIsmi);
        this.muavinForm.controls.muavinSoyIsmi.setValue(this.updateMuavin.muavinSoyIsmi);
        this.muavinForm.controls.muavinYasi.setValue(this.updateMuavin.muavinYasi);
        this.muavinForm.controls.muavinDogumYili.setValue(this.updateMuavin.muavinDogumYili);
        this.muavinForm.controls.muavinMaas.setValue(this.updateMuavin.muavinMaas);
      }
    );

  }

}

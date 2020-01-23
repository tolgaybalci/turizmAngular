import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {PojoService} from '../pojo.service';

@Component({
  selector: 'app-otobus',
  templateUrl: './otobus.component.html',
  styleUrls: ['./otobus.component.css']
})
export class OtobusComponent implements OnInit {

  otobusler: any;
  stateOtobusEkleme = false;

  otobusForm: FormGroup;

  displayOtobus = false;
  displayingOtobus: any;

  updateOtobus: any;
  submitButtonText = 'Otobus Ekle';

  constructor(@Inject(HttpClient) private httpClient: HttpClient, @Inject(PojoService) private pojoService: PojoService) {
    this.otobusForm = new FormGroup( {
      plaka: new FormControl(),
      otobusModeli: new FormControl(),
      koltukSayisi: new FormControl(),
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.updateOtobus) {
      this.otobusForm.value.id = this.updateOtobus.id;
      this.pojoService.update(`http://localhost:8080/otobusler/otobus`, this.otobusForm.value).subscribe(
        (next) => {
          this.httpClient.get('http://localhost:8080/otobusler').subscribe(
            (result) => {
              this.otobusler = result;
              this.updateOtobus = null;
              this.otobusForm.reset();
              this.submitButtonText = 'Otobus Ekle';
            }
          );
        }
      ) ;
    } else {
      this.pojoService.save('http://localhost:8080/otobusler', this.otobusForm.value).subscribe(
        (next) => {
          this.httpClient.get('http://localhost:8080/otobusler').subscribe(
            (result) => {
              this.otobusler = result;
              this.otobusForm.reset();
              this.stateOtobusEkleme = false;
            }
          );
        }
      );
    }

  }

  onDelete(id: string) {
    this.pojoService.delete(`http://localhost:8080/otobusler/otobus/${id}`, this.otobusForm.value).subscribe(
      (next) => {
        this.httpClient.get('http://localhost:8080/otobusler').subscribe(
          (result) => {
            this.otobusler = result;
          }
        );
      }
    );
  }

  onDisplay(id: string) {
    this.pojoService.get(`http://localhost:8080/otobusler/${id}`).subscribe(
      (next) => {
        this.displayingOtobus = next;
        this.displayOtobus = true;
      }
    );
  }

  onUpload(id: string) {

    this.submitButtonText = 'Güncelle';

    this.stateOtobusEkleme = true;
    this.pojoService.get(`http://localhost:8080/otobus/${id}`).subscribe(
      (next) => {
        this.updateOtobus = next;
        this.otobusForm.controls.firmaIsmi.setValue(this.updateOtobus.plaka);
        this.otobusForm.controls.otobusModeli.setValue(this.updateOtobus.otobusModeli);
        this.otobusForm.controls.koltukSayisi.setValue(this.updateOtobus.koltukSayisi);
        this.otobusForm.controls.otobusSayisi.setValue(this.updateOtobus.otobusSayisi);
      }
    );

  }

}

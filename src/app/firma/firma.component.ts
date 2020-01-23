import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PojoService} from '../pojo.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.css']
})
export class FirmaComponent implements OnInit {

  firmalar: any;
  stateFirmaEkleme = false;

  firmaForm: FormGroup;

  displayFirma = false;
  displayingFirma: any;

   updateFirma: any;
   submitButtonText = 'Firma Ekle';

  constructor(@Inject(HttpClient) private httpClient: HttpClient, @Inject(PojoService) private pojoService: PojoService) {
    this.firmaForm = new FormGroup( {
      firmaIsmi: new FormControl(),
      firmaAdresi: new FormControl(),
      calisanSayisi: new FormControl(),
      otobusSayisi: new FormControl(),
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.updateFirma) {
      this.firmaForm.value.id = this.updateFirma.id;
      this.pojoService.update(`http://localhost:8080/firmalar/firma`, this.firmaForm.value).subscribe(
        (next) => {
          this.pojoService.get('http://localhost:8080/firmalar').subscribe(
            (result) => {
              this.firmalar = result;
              this.updateFirma = null;
              this.firmaForm.reset();
              this.submitButtonText = 'Firma Ekle';
            }
          );
        }
      ) ;
    } else {
      this.pojoService.save('http://localhost:8080/firmalar', this.firmaForm.value).subscribe(
        (next) => {
          this.pojoService.get('http://localhost:8080/firmalar').subscribe(
            (result) => {
              this.firmalar = result;
              this.firmaForm.reset();
              this.stateFirmaEkleme = false;
            }
          );
        }
      );
    }

  }

  onDelete(id: string) {
    this.pojoService.delete(`http://localhost:8080/firmalar/firma/${id}`, this.firmaForm.value).subscribe(
      (next) => {
        this.httpClient.get('http://localhost:8080/firmalar').subscribe(
          (result) => {
            this.firmalar = result;
          }
        );
      }
    );
  }

  onDisplay(id: string) {
    this.pojoService.get(`http://localhost:8080/firmalar/${id}`).subscribe(
      (next) => {
        this.displayingFirma = next;
        this.displayFirma = true;
      }
    );
  }

  onUpload(id: string) {

    this.submitButtonText = 'Güncelle';

    this.stateFirmaEkleme = true;
    this.pojoService.get(`http://localhost:8080/firmalar/${id}`).subscribe(
      (next) => {
        this.updateFirma = next;
        this.firmaForm.controls.firmaIsmi.setValue(this.updateFirma.firmaIsmi);
        this.firmaForm.controls.firmaAdresi.setValue(this.updateFirma.firmaAdresi);
        this.firmaForm.controls.calisanSayisi.setValue(this.updateFirma.calisanSayisi);
        this.firmaForm.controls.otobusSayisi.setValue(this.updateFirma.otobusSayisi);
      }
    );

  }


}

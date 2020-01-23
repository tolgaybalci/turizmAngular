import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {PojoService} from '../pojo.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {

  terminaller: any;
  stateTerminalEkleme = false;

  terminalForm: FormGroup;

  displayTerminal = false;
  displayingTerminal: any;

  updateTerminal: any;
  submitButtonText = 'Terminal Ekle';

  constructor(@Inject(HttpClient) private httpClient: HttpClient, @Inject(PojoService) private pojoService: PojoService) {
    this.terminalForm = new FormGroup( {
      terminalSehri: new FormControl(),
      terminalAdresi: new FormControl(),
      yolcuKapasitesi: new FormControl(),
      koordinatlari: new FormControl(),
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.updateTerminal) {
      this.terminalForm.value.id = this.updateTerminal.id;
      this.pojoService.update(`http://localhost:8080/terminaller/terminal`, this.terminalForm.value).subscribe(
        (next) => {
          this.httpClient.get('http://localhost:8080/terminaller').subscribe(
            (result) => {
              this.terminaller = result;
              this.updateTerminal = null;
              this.terminalForm.reset();
              this.submitButtonText = 'Terminal Ekle';
            }
          );
        }
      ) ;
    } else {
      this.pojoService.save('http://localhost:8080/terminaller', this.terminalForm.value).subscribe(
        (next) => {
          this.httpClient.get('http://localhost:8080/terminaller').subscribe(
            (result) => {
              this.terminaller = result;
              this.terminalForm.reset();
              this.stateTerminalEkleme = false;
            }
          );
        }
      );
    }

  }

  onDelete(id: string) {
    this.pojoService.delete(`http://localhost:8080/terminaller/terminal/${id}`, this.terminalForm.value).subscribe(
      (next) => {
        this.httpClient.get('http://localhost:8080/terminaller').subscribe(
          (result) => {
            this.terminaller = result;
          }
        );
      }
    );
  }

  onDisplay(id: string) {
    this.pojoService.get(`http://localhost:8080/terminaller/${id}`).subscribe(
      (next) => {
        this.displayingTerminal = next;
        this.displayTerminal = true;
      }
    );
  }

  onUpload(id: string) {

    this.submitButtonText = 'Güncelle';

    this.stateTerminalEkleme = true;
    this.pojoService.get(`http://localhost:8080/terminal/${id}`).subscribe(
      (next) => {
        this.updateTerminal = next;
        this.terminalForm.controls.soforIsmi.setValue(this.updateTerminal.terminalSehri);
        this.terminalForm.controls.terminalSehri.setValue(this.updateTerminal.terminalAdresi);
        this.terminalForm.controls.terminalAdresi.setValue(this.updateTerminal.terminalAdresi);
        this.terminalForm.controls.yolcuKapasitesi.setValue(this.updateTerminal.yolcuKapasitesi);
        this.terminalForm.controls.koordinatlari.setValue(this.updateTerminal.koordinatlari);
      }
    );

  }

}

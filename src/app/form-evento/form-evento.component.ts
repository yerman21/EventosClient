import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { EventoService } from '../_services/evento.service';
import { UtilitarioService } from '../_services/utilitario.service';
import { NotificacionService } from '../_services/notificacion.service';

// const MyAwesomeRangeValidator: ValidatorFn = (fg: FormGroup) => {
//   const start = fg.get('fecha_de_asistencia').value;
//   const end = fg.get('fecha_de_termino').value;
//  return start !== null && end !== null && start < end
//    ? null 
//    : { range: true };
// };

@Component({
  selector: 'app-form-evento',
  templateUrl: './form-evento.component.html',
  styleUrls: ['./form-evento.component.css']
})
export class FormEventoComponent implements OnInit {
  // @Input()
  iddEvento:number = null;
  @Output() onSave = new EventEmitter<Boolean>();
  fileToUpload: File = null;
  formEvento = this.fb.group({
    titulo: new FormControl("", Validators.maxLength(100)),
    subtitulo: new FormControl("", Validators.maxLength(50)),
    descripcion: new FormControl("", Validators.maxLength(200)),
    foto: [null],
    fecha_de_asistencia: new FormControl(null),
    fecha_de_termino: new FormControl(null),
  });

  constructor(
    private eventoService:EventoService,
    private fb:FormBuilder,
    private utilitario:UtilitarioService,
    private notiService:NotificacionService
    ) { }

  ngOnInit() {
    this.iddEvento = this.eventoService.iddEvento;
    if(this.iddEvento){
      this.formEvento.controls.foto.setValidators([]);
    }else{
      this.formEvento.controls.foto.setValidators([Validators.required]);
    }
    this.formEvento.controls.foto.updateValueAndValidity();
    this.fillFormEvento();
  }

  fillFormEvento(){
    if(!this.iddEvento) return;
    this.eventoService.getOneEvento(this.iddEvento).subscribe(
      response => {
        response["data"].evento.foto = null;
        this.changeFormatDateISO(response["data"].evento, ["fecha_de_asistencia", "fecha_de_termino"]);
        this.formEvento.patchValue(response["data"].evento);
       },
      error => { this.notiService.addNotifiDanger(error.error["errorGeneral"]) }
    );
  }

  actionFormEvento(){
    if(this.formEvento.invalid) return;
    console.log(this.iddEvento);
    console.log(this.formEvento.value);
    if(this.iddEvento){
      this.editEvento();
    }else{
      this.nuevoEvento();
    }
  }

  nuevoEvento(){
    this.eventoService.save(this.formEvento.value, this.fileToUpload).subscribe(
      response => {
        this.notiService.addNotifiSuccess(response["message"]);
        this.onSave.emit(true);
      },
      error => this.notiService.addNotifiDanger(error.error["errorGeneral"])
    );
  }

  editEvento(){
    if(!this.iddEvento) return;
    this.eventoService.updated(this.formEvento.value, this.iddEvento, this.fileToUpload).subscribe(
      response => { 
        this.notiService.addNotifiInfo(response["message"]);
        this.onSave.emit(true); 
      },
      error => this.notiService.addNotifiDanger(error.error["errorGeneral"])
    );
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);    
  }

  changeFormatDateISO(data, fields:Array<string>){
    for(let field of fields){
       data[field] = this.utilitario.dateToFormatISO(data[field]);
    }
  }

}

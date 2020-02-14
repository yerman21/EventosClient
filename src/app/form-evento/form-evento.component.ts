import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EventoService } from '../_services/evento.service';

@Component({
  selector: 'app-form-evento',
  templateUrl: './form-evento.component.html',
  styleUrls: ['./form-evento.component.css']
})
export class FormEventoComponent implements OnInit {
  @Input() iddEvento:number = null;
  fileToUpload: File = null;
  
  formEvento = this.fb.group({
    titulo: new FormControl("", Validators.maxLength(100)),
    subtitulo: new FormControl("", Validators.maxLength(50)),
    descripcion: new FormControl("", Validators.maxLength(200)),
    foto: [null],
    fecha_de_asistencia: new FormControl(null),
    fecha_de_termino: new FormControl(null),
  });
  
  // formEvento = new FormGroup({
  //   titulo: new FormControl("", Validators.maxLength(100)),
  //   subtitulo: new FormControl("", Validators.maxLength(50)),
  //   descripcion: new FormControl("", Validators.maxLength(200)),
  //   foto: new FormData(),
  //   fecha_de_asistencia: new FormControl(null),
  //   fecha_de_termino: new FormControl(null),
  // });

  constructor(
    private eventoService:EventoService,
    private fb:FormBuilder,
    private cd: ChangeDetectorRef
    ) { }

  ngOnInit() {
  }

  saveFormEvento(){
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
      response => { console.log(response) },
      error =>  { console.log(error) }
    );
  }

  editEvento(){
    if(!this.iddEvento) return;
    this.eventoService.updated(this.formEvento.value, this.iddEvento).subscribe(
      response => { console.log(response) },
      error =>  { console.log(error) }
    );
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);    
  }

  onFileChange(event) {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;      
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.formEvento.patchValue({
          foto: reader.result
       });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

}

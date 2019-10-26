import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Equipo } from '../domain/misequipos';
import { EquiposService } from '../services/individuos/misequipos.service';
import { Router } from '@angular/router'
import { MatDialog, MatTable } from '@angular/material';
import { NewEquipoComponent } from '../nuevoEquipo/nuevoEquipo.component'
import { Usuario } from '../domain/usuario'
import { LoginService } from '../services/loginService/login.service';


function mostrarError(component, error) {
  console.log('error', error)
  component.errors.push(error.error)
}

@Component({
  selector: 'app-misEquipos',
  templateUrl: './misEquipos.component.html',
  styleUrls: ['./misEquipos.component.css']
})
export class MisEquiposComponent implements OnInit {

  equipos: Array<Equipo> = []
  errors = [];
  dataSource: MatTableDataSource<Equipo>;
  equipoSelec:Equipo;
  displayedColumns: string[] = ['nombre', 'lider', 'propietario', 'actions'];
  constructor(public equiposService: EquiposService, private router: Router,
    private loginService: LoginService, public dialog: MatDialog) {

     }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator; table: MatTable<Equipo>;

  async ngOnInit() {
    try {
      this.equipos = await this.equiposService.todosLosEquipos()
      this.dataSource = new MatTableDataSource<Equipo>(this.equipos);
    } catch (error) {
      mostrarError(this, error)
    }
    console.log(this.dataSource)
  }

  getUser() {
    return this.loginService.getUser()
  }

  async actualizarDato(){
    try{this.equipos = await this.equiposService.todosLosEquipos()
    this.dataSource = new MatTableDataSource<Equipo>(this.equipos);}
    catch(error){
      mostrarError(this, error)
    }
  }
  async abandonar(equipo: Equipo) {
    try {
      console.log(equipo)
      //  equipo.eliminarIntregrante(this.perfil.nombre)
      } catch (error) {
      mostrarError(this, error)
    }
    console.log(equipo)
  }

  eliminar(elemento) {
  this.dataSource.data = this.dataSource.data.filter(i => i !== elemento)
  // .filter(i => i !== elemento)
  //  .map((i, idx) => (id.Equipo = (idx + 1), i)); // Update the position
  }

  async eliminarEquipo(equipo: Equipo) {
    try {
      if (this.equipos.includes(equipo)) {
        const nuevoEq= this.equipos.splice(this.equipos.indexOf(equipo), 1)
        return  this.dataSource = new MatTableDataSource<Equipo>(nuevoEq);
    }
    
    } catch (error) {
      mostrarError(this, error)
    }
    console.log(equipo)
  }

  agregarEquipo(equipo:Equipo){
    this.equipos.includes(equipo)
    this.dataSource = new MatTableDataSource<Equipo>(this.equipos);
    
  }

  openDialog(accion, objeto) {
    objeto.accion=accion;
    const dialogRef = this.dialog.open(NewEquipoComponent, {
      width: '500px',
      data: objeto
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('se esta cerrando el Dialog')
      if (result.event == 'Nuevo') {
        console.log(result.data)
        this.agregarEquipo(result.data);
      } else if (result.event == 'Actualizar') {
        console.log(result.data)
        this.actualizarEquipo(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  actualizarEquipo(obj) {
    this.equipos = this.equipos.filter((value, key) => {
      if ( value.nombre == obj.nombre) {
        // value.nombre = obj.nombre;
        value.lider = obj.lider;
        value.propietario= obj.propietario;
        value.integrantes=obj.integrantes;
        this.dataSource = new MatTableDataSource<Equipo>(this.equipos);
      }
      return true;
    });
  }
  deleteRowData(row_obj) {
    this.equipos = this.equipos.filter((value, key) => {
      return value.id != row_obj.id;
    });
  }


}

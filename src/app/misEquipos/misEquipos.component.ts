import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Equipo } from '../domain/misequipos';
import * as _ from 'lodash'
import { Router } from '@angular/router'
import { MatDialog, MatTable } from '@angular/material';
import { NewEquipoComponent } from '../nuevoEquipo/nuevoEquipo.component'
import { LoginService } from '../services/loginService/login.service';
import { TeamService } from '../services/typeRelationService/teamService/team.service';


function mostrarError(component, error) {
  console.log('se rompio todooooo', error)
  component.errors.push(error.error)
}

@Component({
  selector: 'app-misEquipos',
  templateUrl: './misEquipos.component.html',
  styleUrls: ['./misEquipos.component.css']
})
export class MisEquiposComponent implements OnInit {

  equipos: Equipo[] = []
  dataSource: MatTableDataSource<Equipo>;
  equipoSelec: Equipo;
  displayedColumns: string[] = ['nombre', 'lider', 'propietario', 'actions'];
  constructor(public teamService: TeamService, private router: Router,
    private loginService: LoginService, public dialog: MatDialog) {

  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator; table: MatTable<Equipo>;

  async ngOnInit() {
    try {
      this.equipos = await this.teamService.getAllTeam()
      this.dataSource = new MatTableDataSource<Equipo>(this.equipos);
    } catch (error) {
      mostrarError(this, error)
    }
    console.log(this.dataSource)
  }

  getUser() {
    return this.loginService.getUser()
  }

  async actualizarDato() {
    try {
    this.equipos = await this.teamService.getAllTeam()
      this.dataSource = new MatTableDataSource<Equipo>(this.equipos);
    }
    catch (error) {
      mostrarError(this, error)
    }
  }
  async abandonar(equipo: Equipo) {
    try {
      // aqui ahi que pegarselo al backend
      // await this.teamService.updateTeam(equipo)
    } catch (error) {
      mostrarError(this, error)
    }
  }

  removeEquipo(equipo: Equipo) {
    _.remove(this.equipos, equipo)
  }
  

  async eliminarEquipo(equipo: Equipo) {
    try {
      this.removeEquipo(equipo)
    } catch (error) {
      mostrarError(this, error)
    }
  }

  openDialog(equipo: Equipo) {
    const dialogRef = this.dialog.open(NewEquipoComponent, {
      data: equipo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('se esta cerrando el Dialog')
      
    });
  }
  individualAdmin(propietario: string) {
    return propietario == this.loginService.getidUserLogged()
  }

  removeTeamAdmin(equipo: string){
    return equipo != this.loginService.getidUserLogged()
  }

}

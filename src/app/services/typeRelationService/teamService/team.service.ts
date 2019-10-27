import { Injectable } from '@angular/core';
import { Individuo } from 'src/app/domain/Individuo';
import { LoginService } from '../../loginService/login.service';
import { HttpClient } from '@angular/common/http';
import { REST_SERVER_URL } from '../../configuration';
import { Equipo } from 'src/app/domain/misequipos';

@Injectable({
  providedIn: 'root'
})
export class TeamService implements TeamService {


  constructor(private httpCLient: HttpClient, private loginService: LoginService) { }

   getidUserLogged() {
    return this.loginService.getidUserLogged()
  }

  async getAllTeam() {
    const teams = await this.httpCLient.get<Equipo[]>(REST_SERVER_URL +  "/equipos/" + this.getidUserLogged()).toPromise()
    return teams.map((team) => Equipo.fromJson(team)) 
  }

 async getIndividuals() {
    const individuals = await this.httpCLient.get<Individuo[]>(REST_SERVER_URL +  '/enemigos/' + this.getidUserLogged()).toPromise()
    return individuals.map((individual) => Individuo.fromJson(individual)) 
  }
  async getNonIndividuals() {
    const Individuals = await this.httpCLient.get<Individuo[]>(REST_SERVER_URL + '/enemigos_no_agregados/' + this.getidUserLogged()).toPromise()
    return Individuals.map((Individual) => Individuo.fromJson(Individual))
 
  }

  updateTeam(teamUpdate: Equipo){
    return this.httpCLient.put<Equipo>(REST_SERVER_URL + "/actualizar_equipo", teamUpdate).toPromise()
  }


  updateIndividual(individualUpdate: Individuo) {

  }
  deleteIndividual(deleteIndividual: Individuo) {

  }




}

import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CinemaService} from '../services/cinema.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {
public villes;
public cinemas;
public currentvilles; public curretcinemans;
public  salles;
public currentProjection;
  private selectedTickets: any;


constructor(public cinemaService : CinemaService) {
  }

  ngOnInit(): void {
    this.cinemaService.getvilles().subscribe(data => {
      this.villes = data ;
    } ,err=>{
      console.log ("err") ;

    })


  }

  onGetcinemas(v)  {
    this.currentvilles=v;
    this.salles=undefined;
    this.cinemaService.getCinemas(v).subscribe(data=>{
      this.cinemas = data ;
    },err=>{
      console.log ("err") ;

    })


  }

  onGetsalles(c) {
    this.curretcinemans =c;
    this.cinemaService.getSalles(c).subscribe(data=>{
      this.salles=data;
      this.salles._embedded.salles.forEach(salle=>{
        this.cinemaService.getProjections(salle).subscribe(data=>{
          salle.projections = data ;
        },err=>{
          console.log ("err") ;

        })
      })
    },err=>{
      console.log("err")
    })

  }

  onGetTicketsPlaces(p) {
    this.currentProjection=p;
    this.cinemaService.getTicketsPlaces(p).subscribe(data=>{
      this.currentProjection.tickets=data;
      this.selectedTickets=[];
      console.log(this.currentProjection);
    },err=>{
      console.log ("err") ;

    })


  }

  onSelectTicket(t) {
  if(!t.selected){
    t.selected=true;
    this.selectedTickets.push(t);
  }else {
    t.selected=false;

    this.selectedTickets.splice(this.selectedTickets.indexOf(t),1);
  }
  console.log(this.selectedTickets);


  }

  getTicketClass(t) {
  let str ="btn ticket ";
  if (t.reservee==true){
    str+="btn-danger"


  }else if (t.selected){
    str+="btn-warning"

  }else {
    str+="btn-success"
  }
 return str;


  }
}


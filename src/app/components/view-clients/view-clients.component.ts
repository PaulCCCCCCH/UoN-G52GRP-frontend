import { Component, OnInit } from '@angular/core';
import { Client } from '../../../classes/client';
import { ClientService } from '../../services/client/client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.scss']
})
export class ViewClientsComponent implements OnInit {

  clients: Client[];
  finished = false;
  id = this.route.snapshot.paramMap.get('id');

  constructor(private clientService: ClientService,
  private route: ActivatedRoute){}

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.finished = true;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Client } from '../../../classes/client';
import { ClientService } from '../../services/client/client.service';
import { ActivatedRoute } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

/**
 * The page shows a list of clients (companies) and provide
 * services like add/remove. It also has links to view some
 * detailed information of a client.
 *
 * Note that only the clients that current user has access to
 * will be shown.
 *
 * @author Chonghan Chen
 */

@Component({
  selector: 'app-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.scss']
})
export class ViewClientsComponent implements OnInit {

  /**
   * A list of clients (companies)
   */
  clients: Client[];

  /**
   * Will be set to true when the page finishes loading.
   * The page will not be displayed until this is set to True.
   * This is necessary since we want the page to be shown
   * all at once instead of partially at first, then the rest.
   *
   */
  finished = false;

  /**
   * The client that the user selects. Used when editing.
   */
  selectedClient: Client;

  /**
   * The input field of the 'Add new client' pop-up window.
   * This is dynamically bound to the input.
   */
  newName: string;

   /**
   * The input field of the 'Add new client' pop-up window.
   * This is dynamically bound to the input.
   */
  newDescription: string;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  /**
   * Initializes the page by retrieving the list of clients
   * from the database. [[this.finished]] will be set to True when
   * this is done.
   */
  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients.data;
      this.finished = true;
    });
  }

  /**
   * Open the modal with the given tag and set client in
   * the argument to be the 'selected client'.
   *
   * @param content the tag of the modal to be opened
   * @param selectedClient the client that the user is operating on
   *
   */
  openWindow(content, selectedClient: Client) {
    this.modalService.open(content, {windowClass : 'dark-modal'});
    this.selectedClient = selectedClient;
    this.newName = '';
    this.newDescription = '';
  }

  /**
   * Used both by adding a client and editing a client.
   * Input name and description will be sent to the database
   * by calling [[this.addClient]] or [[this.editClient]].
   */
  submit() {
    if (this.selectedClient === null) {
      this.addClient();
    } else {
      this.editClient();
    }
  }

  /**
   * Removes a client.
   */
  removeClient() {
    this.clientService.removeClient(this.selectedClient._id).subscribe(
      res => {
        alert('Successfully deleted client <' + this.selectedClient.name + '>');
        this.ngOnInit();
        this.modalService.dismissAll();
      },
      err => {
        alert('Failed to delete the client.');
      }
    );
  }

  /**
   * Sends an update request to the server with new client name and
   * description.
   */
  editClient() {
    const selectedId = this.selectedClient._id;
    this.clientService.editClient(selectedId, this.newName, this.newDescription).subscribe(
      res => {
        alert('Client information updated successfully!');
        this.ngOnInit();
        this.modalService.dismissAll();
      },
      err => {
        alert('Operation failed!');
      }
    );
  }

  /**
   * Adds a new client by sending a POST request to the server.
   */
  addClient() {
    this.clientService.addClient(this.newName, this.newDescription).subscribe(
      res => {
        alert('Client created successfully!');
        this.ngOnInit();
        this.modalService.dismissAll();
      },
      err => {
        alert('Server error! Failed to add client.');
      }
    );
  }


}

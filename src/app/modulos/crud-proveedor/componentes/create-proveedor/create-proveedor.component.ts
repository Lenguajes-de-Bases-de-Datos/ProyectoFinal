import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-create-proveedor',
  templateUrl: './create-proveedor.component.html',
  styleUrls: ['./create-proveedor.component.css']
})
export class CreateProveedorComponent implements OnInit {
  
  

  constructor(private request:RequestsService) {

   }

  ngOnInit(): void {
  }

}

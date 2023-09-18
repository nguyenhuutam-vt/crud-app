import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  ngOnInit(): void {
    //get gia trị ra
    this.empForm.patchValue(this.data);
  }

  education: string[] = ['Matric', 'Intermedia', 'Diploma', 'Graduate'];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _diaglogRef: MatDialogRef<EmpAddEditComponent>,
    //bat gia trị
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }
  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        console.log(this.empForm.value);
        this._empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Employee updated', 'done');
              this._diaglogRef.close(true);
              // window.location.reload();
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        console.log(this.empForm.value);
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee add success', 'done');
            this._diaglogRef.close(true);
            // window.location.reload();
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}

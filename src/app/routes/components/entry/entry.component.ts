import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Weight } from '../../models/weight';
import { DataServie } from '../../services/data.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
})
export class EntryComponent implements OnInit {
  submitted = false;
  form!: FormGroup;

  constructor(public dataService: DataServie) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      date: new FormControl(null, Validators.compose([Validators.required])),
      weight: new FormControl(
        0,
        Validators.compose([Validators.required, Validators.min(10)])
      ),
      notes: new FormControl(''),
    });
  }

  submit() {
    this.submitted = true;
    if (this.form.valid) {
      this.dataService.add(this.form.value as Weight);
    }
  }
}

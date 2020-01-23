import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-job-list',
  templateUrl: './landing-job-list.component.html',
  styleUrls: ['./landing-job-list.component.scss']
})
export class LandingJobListComponent implements OnInit {

  searchForm: FormGroup;
  faSlidersH = faSlidersH;
  filterHidden: boolean = true;
  styleObject = {'inputContainer': {}, 'inputHeader': {fontSize: "1.5rem", border: "1px solid #888"}, 'optionContainer': {backgroundColor: "#555", top: "3.3rem", boxShadow: '0px 1px 2px #aaa'}, 'option': {fontSize: "1.5rem", borderBottom: "1px solid #ddd", backgroundColor: '#fff'}};
  jobs = [];
  cities = [];
  industries = [];
  employmentType = [
    {name: 'Part Time', value: 'PARTTIME'},
    {name: 'Full Time', value: 'FULLTIME'},
    {name: 'Project Based', value: 'PROJECTBASED'},
    {name: 'Permanent', value: 'PERMANENT'},
    {name: 'Temporary', value: 'TEMPORARY'},
    {name: 'Internship/OJT', value: 'INTERNSHIP/OJT'},
    {name: 'Freelance', value: 'FREELANCE'},
  ];
  
  constructor(private formBuilder: FormBuilder, private Route: ActivatedRoute) {
    this.Route.data.subscribe(res => {
      let data = res.jsRes;
      if(data) {
        this.jobs = data.jobs;
      }
      // console.log(data)
    });
   }
  
  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      query: ['', Validators.nullValidator],
      city: ['', Validators.nullValidator],
      industry: ['', Validators.nullValidator],
      employmentType: ['', Validators.nullValidator]
    })


  }

  toggleFilter(event){
    event.stopPropagation();
    this.filterHidden = !this.filterHidden;
  }
}

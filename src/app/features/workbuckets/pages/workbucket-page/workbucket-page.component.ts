import { Component } from '@angular/core';
import { WorkbucketSelectComponent } from './components/workbucket-select/workbucket-select.component';

@Component({
  selector: 'app-workbucket-page',
  standalone: true,
  imports: [WorkbucketSelectComponent],
  templateUrl: './workbucket-page.component.html',
  styleUrl: './workbucket-page.component.scss',
})
export class WorkbucketPageComponent {

  sampleBuckets = [
    'Print Modernization',
    'eSignature Rewrite',
    'DevOps Initiative',
    'Angular User Group',
    'Resource Management',
    'Resource Management',
    'Resource Management',
    'Resource Management',
    'Resource Management',
    'Resource Management',
    'Resource Management',
    'Resource Management',
    'Resource Management',
    'Resource Management',
    'Resource Management',
    'Resource Management',
    'Resource Management',
    'Resource Management',
    'Resource Management',
    'Resource Management',
    'Resource Management',
    'Resource Management',
    'Resource Management',
    'Resource Management',
    'Resource Management',
    'Angular User Group',
  ]

}

import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {CodeValideOuiNon} from '../../model/codeValideOuiNon';
import {TestedCodeResult} from '../../model/testedCodeResult';
import {CodeService} from '../../service/code.service';
import { faCopy, faCheckCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import {interval} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  codeValideOuiNon: CodeValideOuiNon;
  stats: TestedCodeResult;
  winnerCodes: CodeValideOuiNon[];

  faCopy = faCopy;
  faCheckCircle = faCheckCircle;
  faMinusCircle = faMinusCircle;
  @ViewChild('tooltipSpan', null) tooltipSpan: ElementRef;

  constructor(private codeService: CodeService) {}

  async ngOnInit() {
    this.winnerCodes = new Array();
    await this.getUntestedCode();
    interval(1000).subscribe(x => this.weHaveAWinner());
    interval(1000).subscribe(x => this.getStats());
    interval(1000).subscribe(x => this.checkMyCodeIsUntested());
  }

  async checkMyCodeIsUntested() {
    const untested = await this.codeService.checkMyCodeIsUntested(this.codeValideOuiNon) as boolean;
    console.log(untested);

    if (!untested) {
      await this.getUntestedCode();
    }
  }

  async getUntestedCode() {
    this.codeValideOuiNon = await this.codeService.getUntestedCode() as CodeValideOuiNon;
  }

  async invalidCode() {
    await this.codeService.postInvalidCode(this.codeValideOuiNon);
    this.getUntestedCode();
  }

  async gagner() {
    await this.codeService.postValideCode(this.codeValideOuiNon);
  }

  async getStats() {
    this.stats = await this.codeService.getStats() as TestedCodeResult;
  }

  async weHaveAWinner() {
    this.winnerCodes = await this.codeService.getWinnerCode() as CodeValideOuiNon[];
  }

  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  onMouseMove(e) {
    let x = e.clientX;
    let y = e.clientY;
    this.tooltipSpan.nativeElement.style.top = (y + 20) + 'px';
    this.tooltipSpan.nativeElement.style.left = (x + 20) + 'px';
  }


}

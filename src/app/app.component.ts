import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataSet, Network } from '@diyguy/vis-network/standalone';

function ctxRendererSquare({
  ctx: any,
  id: any,
  x: number,
  y: number,
  state: { selected: boolean, hover: boolean },
  style: any,
  label: any,
}) {
  return {
    drawNode() {
      ctx.save();
      var r = style.size;
      ctx.fillStyle = "red";
      ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    },
    nodeDimensions: { width: 20, height: 20 },
  };
}

function ctxRendererCircle({
  ctx: any,
  id: any,
  x: number,
  y: number,
  state: { selected: boolean, hover: boolean },
  style: any,
  label: any,
}) {
  return {
    drawNode() {
      ctx.save();
      var r = style.size;
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = "green";
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    },
    nodeDimensions: { width: 20, height: 20 },
  };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('container', { static: true })
  container!: ElementRef<HTMLDivElement>;

  title = 'ng-vis-network';

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.init();
    })
  }

  init(): void {
    const nodes = new DataSet([
      { id: 1, shape: "custom", ctxRenderer: ctxRendererSquare },
    ]);

    const edges = new DataSet([]);

    const data = {
      nodes: nodes,
      edges: edges,
    };

    const options = {};
    const network = new Network(this.container.nativeElement, data, options);

    let iter = 0;

    setInterval(() => {
      nodes.updateOnly({
        id: 1,
        ctxRenderer: iter % 2 ? ctxRendererSquare : ctxRendererCircle,
      });
      iter++;
    }, 1000);
  }
}

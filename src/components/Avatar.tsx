import { useRef, useEffect } from "react";

const Avatar = () => {
  const avatarRef: React.RefObject<HTMLCanvasElement> = useRef(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);

  let px = 4;
  let px_s = 4;

  useEffect(() => {
    const canvas = avatarRef.current;
    if (canvas) {
      ctx.current = canvas.getContext("2d");
      ravatar();
    }
  }, []);

  function ravatar() {
    // Canvas supported
    if (ctx.current) {
      const canvasContext = ctx.current; // Access the CanvasRenderingContext2D from ctx.current

      canvasContext.clearRect(0, 0, 300, 300); // Use canvasContext instead of ctx.current

      //   ctx = canvas.getContext("2d");

      // Background gradient
      //   var cxlg = ctx.createLinearGradient(0, 0, 300, 300);
      //   cxlg.addColorStop(0, "#555");
      //   cxlg.addColorStop(0.5, "#ccc");
      //   cxlg.addColorStop(1.0, "#666");
      //   ctx.fillStyle = cxlg;

      //   ctx.fillRect(0, 0, 300, 300);
      //   ctx.fillRect(300, 0, 300, 300);
      //   ctx.fillRect(0, 300, 300, 300);

      //   var cxlg = canvasContext.createLinearGradient(0, 0, 300, 300);
      //   cxlg.addColorStop(0, "#555");
      //   cxlg.addColorStop(0.5, "#ccc");
      //   cxlg.addColorStop(1.0, "#666");
      //   canvasContext.fillStyle = cxlg;

      //   canvasContext.fillRect(0, 0, 300, 300);
      //   canvasContext.fillRect(300, 0, 300, 300);
      //   canvasContext.fillRect(0, 300, 300, 300);

      canvasContext.fillStyle = "#191717"; // Set the background to black

      canvasContext.fillRect(0, 0, 300, 300);
      canvasContext.fillRect(300, 0, 300, 300);
      canvasContext.fillRect(0, 300, 300, 300);

      // Set the background to white
      // canvasContext.fillStyle = "#fff";
      // canvasContext.fillRect(0, 0, 300, 300);

      // // Make the canvas background rounded
      // canvasContext.beginPath();
      // canvasContext.arc(150, 150, 150, 0, 2 * Math.PI);
      // canvasContext.closePath();
      // canvasContext.clip();

      // Face
      face();

      // Eyes
      eyes();

      // Mouth
      mouth();

      // Hair
      hair();

      // Body
      body();
    }
  }

  //   ravatar();

  /**
   * Face
   */
  function face() {
    var faces = [
      [
        // F@ face
        [2, 3],
        [3, 3],
        [4, 3],
        [5, 3],
        [6, 3],
        [7, 3.5],
        [2, 4],
        [3, 4],
        [4, 4],
        [5, 4],
        [6, 4],
        [7, 4],
        [2, 5],
        [3, 5],
        [4, 5],
        [5, 5],
        [6, 5],
        [7, 5],
        [2, 6],
        [3, 6],
        [4, 6],
        [5, 6],
        [6, 6],
        [7, 5.5],
      ],
      [
        // Normal face
        [3, 3],
        [4, 3],
        [5, 3],
        [6, 3],
        [3, 4],
        [4, 4],
        [5, 4],
        [6, 4],
        [3, 5],
        [4, 5],
        [5, 5],
        [6, 5],
        [3, 6],
        [4, 6],
        [5, 6],
      ],
      [
        // Alien face
        [1, 3],
        [2, 3],
        [3, 3],
        [4, 3],
        [5, 3],
        [6, 3],
        [7, 3],
        [8, 3],
        [1, 4],
        [2, 4],
        [3, 4],
        [4, 4],
        [5, 4],
        [6, 4],
        [7, 4],
        [8, 4],
        [3, 5],
        [4, 5],
        [5, 5],
        [6, 5],
        [3, 6],
        [4, 6],
        [5, 6],
      ],
    ];

    // Face
    draw(randomColor(), faces[randomBetween(faces.length)]);
  }

  /**
   * Eyes
   */
  function eyes() {
    var eyes = [
      [
        [4, 4],
        [6, 4],
      ],
    ];

    // Eyes
    draw(randomColor(), eyes[randomBetween(eyes.length)]);

    var pupil = [
      [
        [4.5, 4],
        [6.5, 4],
      ],
      [
        [4.5, 4.5],
        [6.5, 4.5],
      ],
      [
        [4, 4.5],
        [6, 4.5],
      ],
      [
        [4, 4],
        [6.5, 4.5],
      ],
      [
        [4.5, 4.5],
        [6, 4],
      ],
      [],
    ];

    // Pupil
    draw(randomColor(), pupil[randomBetween(pupil.length)], px_s);
  }

  function mouth() {
    // Mouth
    var mouths = [
      [
        [4, 6],
        [5, 6],
      ],
    ];

    draw(randomColor(), mouths[randomBetween(mouths.length)]);

    // Decorations
    var decorations = [
      [[5, 6]],
      [
        [4, 6],
        [4.5, 6.5],
        [5, 6],
        [5.5, 6.5],
      ],
      [],
    ];

    draw(randomColor(), decorations[randomBetween(decorations.length)], px_s);
  }

  /**
   * Hair
   */
  function hair() {
    var hair = [
      [
        [4, 0.5],
        [5, 0.5],
        [6, 0],
        [3, 1.5],
        [4, 1],
        [5, 1],
        [6, 1],
        [3, 2.5],
        [4, 2],
        [5, 2],
        [6, 2],
      ],
      [
        [4, 0.5],
        [5, 0.5],
        [6, 0],
        [7, 0],
        [2, 1.5],
        [3, 1.5],
        [4, 1],
        [5, 1],
        [6, 1],
        [2, 2.5],
        [3, 2.5],
        [4, 2],
        [5, 2],
        [6, 2],
        [7, 2],
      ],
      [
        [4, 0.5],
        [5, 0.5],
        [2, 1.5],
        [3, 1.5],
        [4, 1.5],
        [5, 1.5],
        [6, 1.5],
        [7, 1.5],
        [1, 2.5],
        [2, 2.5],
        [3, 2.5],
        [4, 2.5],
        [5, 2.5],
        [6, 2.5],
        [7, 2.5],
        [8, 2.5],
      ],
      [
        [2, 0.5],
        [7, 0.5],
        [2, 1.5],
        [3, 2],
        [4, 1.5],
        [5, 1.5],
        [6, 2],
        [7, 1.5],
        [2, 2.5],
        [4, 2.5],
        [5, 2.5],
        [7, 2.5],
      ],
      [],
    ];

    draw(randomColor(), hair[randomBetween(hair.length)]);
  }

  /**
   * Body
   */
  function body() {
    var bodys = [
      [
        [2, 7],
        [3, 7],
        [4, 7],
        [5, 7],
        [6, 7],
        [1, 8],
        [2, 8],
        [3, 8],
        [4, 8],
        [5, 8],
        [6, 8],
        [7, 8],
        [1, 9],
        [2, 9],
        [3, 9],
        [4, 9],
        [5, 9],
        [6, 9],
        [7, 9],
      ],
      [
        [2, 7],
        [3, 7],
        [4, 7],
        [5, 7],
        [5, 7],
        [6, 7],
        [7, 7],
        [0, 8],
        [1, 8],
        [2, 8],
        [3, 8],
        [4, 8],
        [5, 8],
        [6, 8],
        [7, 8],
        [8, 8],
        [9, 8],
        [0, 9],
        [1, 9],
        [2, 9],
        [3, 9],
        [4, 9],
        [5, 9],
        [6, 9],
        [7, 9],
        [8, 9],
        [9, 9],
      ],
    ];

    // Body
    draw(randomColor(), bodys[randomBetween(bodys.length)]);

    // Decorations
    var body_decorations = [
      [
        // Tie
        [3, 7],
        [5, 7],
        [4, 8],
        [4, 9],
      ],
      [],
    ];

    draw(
      randomColor(),
      body_decorations[randomBetween(body_decorations.length)]
    );

    // Decorations 2
    var body_decorations_2 = [
      [
        [3.5, 7.5],
        [5, 7],
        [5, 7],
        [4, 8],
        [4, 9],
      ],
      [
        [3, 8.5],
        [5.5, 8.5],
        [2.5, 9],
        [6, 9],
        [2.5, 9.5],
        [5.5, 9.5],
      ],
    ];

    draw(
      randomColor(),
      body_decorations_2[randomBetween(body_decorations_2.length)],
      px_s
    );
  }

  /**
   * Draw something.
   */
  function draw(color: string, coords: any, size?: number) {
    coords.forEach((coord: any) => {
      var _size = px;

      if (size !== undefined) {
        _size = size;
      }

      ctx.current!.fillStyle = color;
      ctx.current!.fillRect(coord[0] * px, coord[1] * px, _size, _size);
    });
  }

  /**
   * Return a random value not greater than max.
   */
  function randomBetween(max: number): number {
    let r: number;
    do {
      r = Math.random();
    } while (r === 1.0);
    return parseInt((r * max).toString(), 10);
  }

  /*
   * Return a random color as hex.
   */
  function randomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  return (
    <canvas id="random_avatar" width="40" height="40" ref={avatarRef}>
      Avatar
    </canvas>
  );
};

export default Avatar;

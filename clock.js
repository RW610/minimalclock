function drawClock() {
  const canvas = document.getElementById('clockCanvas');
  const ctx = canvas.getContext('2d');
  const size = Math.min(window.innerWidth, window.innerHeight) * 0.618;
  canvas.width = size;
  canvas.height = size;
  let radius = canvas.width / 2;

  ctx.translate(radius, radius);
  radius = radius * 1;
  animateClock();

  function animateClock() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const millisecond = now.getMilliseconds();

    ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
    drawCircle(ctx, radius, 'lightgrey'); // Нарисовать окружность с указанным цветом
    drawConnectingLines(ctx, radius, hour, minute, second, millisecond);
    drawTimeHand(ctx, hour * 30 + minute / 2 + second / 120 + millisecond / 12000, radius * 1, 3, 'black'); // Hour hand
    drawTimeHand(ctx, minute * 6 + second / 10 + millisecond / 10000, radius * 1, 1, 'black'); // Minute hand
    drawTimeHand(ctx, second * 6 + millisecond / 166.7, radius * 1, 1, '#FF0000'); // Second hand

    requestAnimationFrame(animateClock);
  }

  function drawCircle(ctx, radius, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.arc(0, 0, radius * 1, 0, Math.PI * 2);
    ctx.stroke();
  }

  function drawConnectingLines(ctx, radius, hour, minute, second, millisecond) {
    ctx.beginPath();
    ctx.strokeStyle = 'lightgrey';
    ctx.lineWidth = 1;

    const hourAngle = (hour * 30 + minute * 0.5 + second / 120 + millisecond / 12000) * Math.PI / 180;
    const minuteAngle = (minute * 6 + second / 10 + millisecond / 10000) * Math.PI / 180;
    const secondAngle = (second * 6 + millisecond / 166.7) * Math.PI / 180;

    const hourX = radius * 1 * Math.cos(hourAngle - Math.PI / 2);
    const hourY = radius * 1 * Math.sin(hourAngle - Math.PI / 2);

    const minuteX = radius * 1 * Math.cos(minuteAngle - Math.PI / 2);
    const minuteY = radius * 1 * Math.sin(minuteAngle - Math.PI / 2);

    const secondX = radius * 1 * Math.cos(secondAngle - Math.PI / 2);
    const secondY = radius * 1 * Math.sin(secondAngle - Math.PI / 2);

    ctx.moveTo(hourX, hourY);
    ctx.lineTo(minuteX, minuteY);
    ctx.lineTo(secondX, secondY);
    ctx.closePath();
    ctx.stroke();
  }

  function drawTimeHand(ctx, angle, length, width, color = 'black') {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 0);
    ctx.rotate(angle * Math.PI / 180);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-angle * Math.PI / 180);
  }
}

drawClock();

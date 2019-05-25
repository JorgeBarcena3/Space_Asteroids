

function PointInsideCircle (circlePosition, circleRadius2, point)
{
    // cuadrado de distancia
    var pointToCircleDistance2 =
    ((point.x - circlePosition.x) * (point.x - circlePosition.x)) +
    ((point.y - circlePosition.y) * (point.y - circlePosition.y));
    
    return (pointToCircleDistance2 < circleRadius2);
}

function ManhattanDistance (objectPosition, point)
{
    return (Math.abs(objectPosition.x - point.x) +
            Math.abs(objectPosition.y - point.y));
}

function CheckCollisionRect (point, rectangle)
{
    return point.x >= (rectangle.coord.x) &&
           point.x <= (rectangle.coord.x + rectangle.width) &&
           point.y >= (rectangle.coord.y) &&
           point.y <= (rectangle.coord.y + rectangle.height);
}

function CheckCollisionPolygon (shot, polygon)
{
    // polygon es un array de puntos
    var count = polygon.length;
    for (var i = 0; i < polygon.length; i++)
    {
        var d = DistancePointToSegment(polygon[i], polygon[(i + 1) % polygon.length], shot);
        if (d < 0)
            count--;
    }
    return (count == 0);
}
 
function DistancePointToSegment (A, B, p)
{
    // A y B son los puntos de la recta
    return (((B.x - A.x)*(A.y - p.y) - (A.x - p.x)*(B.y - A.y)) /
            (Math.sqrt((B.x - A.x)*(B.x - A.x) + (B.y - A.y)*(B.y - A.y))));
}


function CheckCircleCollision(x1,y1,r1,x2,y2,r2)
{

    var a;
    var x;
    var y;
  
    a = r1 + r2;
    x = x1 - x2;
    y = y1 - y2;
  
    if (a > Math.sqrt((x * x) + (y * y))) {
      return true;
    } else {
      return false;
    }

}

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    precio = models.PositiveIntegerField(validators=[MinValueValidator(0)])
    stock = models.PositiveIntegerField(validators=[MinValueValidator(0)], default=0)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre

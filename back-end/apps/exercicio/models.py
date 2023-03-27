from django.db import models
from apps.fixa.models import Fixa

PARTES_CORPO =(
    ('BR','Braço'),
    ('CT','Costas'),
    ('PE','Perna'),
    ('PT','Peito'),
    ('AB','Abdomem'),
)

class Exercicio(models.Model):
    nome_exercicio = models.CharField(max_length=800, verbose_name='Nome Exercício')
    serie = models.CharField(max_length=800, verbose_name='Seríe',blank=True)
    descanso = models.CharField(max_length=800, verbose_name='Descanso',blank=True)
    parte_corpo = models.CharField(max_length=2, choices=PARTES_CORPO)
    fixa = models.ForeignKey( Fixa , on_delete=models.CASCADE, verbose_name='Fixa', null=True, blank=True)
  

    class Meta:
        db_table = 'exercicio'
        ordering = ['-id']


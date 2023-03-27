from django.db import models


class Fixa(models.Model):
    dia = models.CharField(max_length=100, verbose_name='Dia', blank=True, null=True)
    nome = models.CharField(max_length=800, verbose_name='Nome Treino')
    obs = models.CharField(max_length=800, verbose_name='Observação')
  

    class Meta:
        db_table = 'fixa'
        ordering = ['-id']
        

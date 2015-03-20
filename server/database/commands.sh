psql -t -P format=unaligned -U postgres -c 'show hba_file'

pg_dump -U michael todo > devops_dashboard.sql

psql -U ops_dashboard ops_dashboard < devops_dashboard.sql 
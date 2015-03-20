psql -t -P format=unaligned -U postgres -c 'show hba_file'

pg_dump -U michael todo -F plain -f devops_dashboard.sql

psql -U ops_dashboard -d devops_dashboard -f devops_dashboard.sql 
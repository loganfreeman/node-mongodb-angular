psql -t -P format=unaligned -U postgres -c 'show hba_file'

pg_dump -U michael todo > devops_dashboard.sql

psql -U ops_dashboard ops_dashboard < devops_dashboard.sql 

# ps on server side
sudo -u postgres psql postgres
# then
\i devops_dashboard.sql
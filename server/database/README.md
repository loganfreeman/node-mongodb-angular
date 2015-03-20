## Backup a single postgres database

```shell
pg_dump -U {user-name} {source_db} -f {dumpfilename.sql}
```


## Restore from a dumpfile
```shell
psql -U {user-name} -d {desintation_db} -f {dumpfilename.sql}
```

## Backup all postgres databases

#### Login as postgres user:
```shell
su postgres
```

#### List the databases:
```shell
psql -l
```

#### Backup all databases:
```shell
pg_dumpall > all.sql
```

#### Verify the backup:
```shell
grep "[\\]connect" all.sql
```

## Backup a specific table
```table
pg_dump --table products -U username {source_database} -f {dumpfilename.sql}


## Restore to a remote server
```shell
pg_dump -U {username} {source_database} | psql -h {hostname} -U {username} -d {destination_db}


## Restore all databases
```shell
su postgres
psql -f all.sql
```

## Restore a single table
```shell
psql -f {dumpfile.sql} {destination_db}

